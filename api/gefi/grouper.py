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
        order_by = params.pop("order_by", None)
        filters = {k: v for k, v in params.items()}
        if keys is None or values is None:
            raise InvalidGrouperURL(
                "expected the url to have `keys` and `values` in the query parameters"
            )

        aggregators = {"sum": Sum, "count": Count, "avg": Avg}
        values = [e.split(":") for e in values[0].split(",")]
        keys = keys[0].split(",")

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

        return_result = (
            self.get_queryset().filter(**filters).values(*keys).annotate(**values_dict)
        )
        if order_by:
            order_by = order_by[0].split(",")
            return_result = return_result.order_by(*order_by)
        return return_result
