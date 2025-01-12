from django.db.models import Sum, Count, Avg
from rest_framework.generics import ListAPIView
from rest_framework.response import Response


class InvalidGrouperURL(Exception):
    pass


class GroupByGenericView(ListAPIView):
    def get(self, request, *_, **__):
        return Response(self.group_queryset(request))

    def group_queryset(self, request):
        params = request.query_params.copy()
        keys = params.pop("keys", None)
        values = params.pop("values", None)
        filters = {k: v for k, v in params.items()}
        if keys is None or values is None:
            raise InvalidGrouperURL(
                "expected the url to have `keys` and `values` in the query parameters"
            )

        aggregators = {"sum": Sum, "count": Count, "avg": Avg}
        values = [e.split(":") for e in values]
        values_dict = {}

        for value in values:
            if len(value) < 2:
                continue
            elif len(value) == 2:
                field, aggregator = value
                values_dict[f"{field}__{aggregator}"] = aggregators[aggregator](field)
            else:
                field, aggregator, new_name = value
                values_dict[new_name] = aggregators[aggregator](field)

        return (
            self.get_queryset().filter(**filters).values(*keys).annotate(**values_dict)
        )
