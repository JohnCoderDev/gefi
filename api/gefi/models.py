from django.db import models


class MovimentationCategoryModel(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "signal"],
                name="unique_name_signal_combination",
            )
        ]
        ordering = [
            "-active",
            "signal",
        ]

    name = models.CharField(
        verbose_name="name of the category",
        blank=False,
        null=False,
        max_length=100,
    )
    signal = models.SmallIntegerField(
        verbose_name="positive = gain, negative = loss",
        choices=[(-1, "perda"), (1, "ganho")],
        blank=False,
        null=False,
    )
    active = models.BooleanField(
        verbose_name="the current category model is active or not",
        default=False,
    )

    def __str__(self):
        return f"MovimentationCategory({self.name}, {self.signal})"


class BenefitedModel(models.Model):
    class Meta:
        ordering = ["-registered_timestamp"]

    name = models.CharField(
        verbose_name="name of the benefited",
        max_length=200,
        primary_key=True,
        unique=True,
        null=False,
        blank=False,
    )
    benefited_type = models.PositiveSmallIntegerField(
        verbose_name="if the benefited type is a physical person or juridic person",
        choices=[(1, "pessoa física"), (2, "pessoa jurídica")],
        null=False,
        blank=False,
    )
    registered_timestamp = models.DateTimeField(
        verbose_name="datetime when the benefited was registered",
        auto_now_add=True,
        null=False,
        blank=False,
        editable=False,
    )
    last_modified_timestamp = models.DateTimeField(
        verbose_name="datetime when the last update happened",
        auto_now=True,
        null=False,
        blank=False,
    )
    benefited_category = models.PositiveSmallIntegerField(
        verbose_name="is a client, supplier or both",
        choices=[
            (1, "cliente"),
            (2, "fornecedor"),
            (3, "ambos"),
        ],
        null=False,
        blank=False,
    )
    movimentation_categories = models.ManyToManyField(MovimentationCategoryModel)


class BenefitModel(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "benefited"],
                name="unique_name_benefited_constraint",
            )
        ]
        ordering = ["-last_movement_timestamp"]

    name = models.CharField(
        verbose_name="name of the product or service",
        max_length=200,
        blank=False,
        null=False,
    )
    benefited = models.ForeignKey(
        verbose_name="the related benefited of the product",
        to=BenefitedModel,
        on_delete=models.PROTECT,
    )
    last_movement_timestamp = models.DateTimeField(
        verbose_name="last time that the movement was done",
        blank=True,
        null=True,
    )
    benefited_category = models.SmallIntegerField(
        verbose_name="if the benefit is a product or service",
        choices=[(1, "produto"), (2, "serviço")],
        null=False,
        blank=False,
    )
    movimentation_categories = models.ManyToManyField(MovimentationCategoryModel)


class PaymentMethodModel(models.Model):
    name = models.CharField(
        verbose_name="name of the payment method",
        null=False,
        primary_key=True,
        blank=False,
        unique=True,
        max_length=100,
    )


class CurrencyModel(models.Model):
    name = models.CharField(
        verbose_name="name of the currency",
        null=False,
        primary_key=True,
        max_length=200,
        blank=False,
        unique=True,
    )
    symbol = models.CharField(
        verbose_name="symbol of the currency",
        max_length=30,
        null=False,
        blank=False,
    )


class MovementsModel(models.Model):
    class Meta:
        ordering = ["-registered_timestamp"]

    registered_timestamp = models.DateTimeField(
        verbose_name="timestamp when the register was created",
        editable=False,
        auto_now_add=True,
    )
    date_movement = models.DateField(
        verbose_name="date when the movement occurrent",
        null=False,
        blank=False,
    )
    movemented_value = models.FloatField(
        verbose_name="value movemented",
        null=False,
        blank=False,
    )
    observation = models.CharField(
        verbose_name="observation about this movement",
        max_length=500,
        blank=True,
    )
    movimentation_categories = models.ForeignKey(
        verbose_name="category associated with this movement",
        to=MovimentationCategoryModel,
        on_delete=models.PROTECT,
    )
    benefited = models.ForeignKey(
        verbose_name="benefited from this movement",
        to=BenefitedModel,
        on_delete=models.PROTECT,
    )
    payment_method = models.ForeignKey(
        verbose_name="payment method of this movement",
        to=PaymentMethodModel,
        on_delete=models.PROTECT,
    )
    benefit = models.ForeignKey(
        verbose_name="associated benefit from this movement",
        to=BenefitModel,
        on_delete=models.PROTECT,
    )
    currency = models.ForeignKey(
        verbose_name="currency used in this movement",
        to=CurrencyModel,
        on_delete=models.PROTECT,
    )


class CurrentAccountBalanceModel(models.Model):
    current_value = models.FloatField(
        verbose_name="current value in the account",
        null=False,
        blank=False,
    )
    currency = models.ForeignKey(
        verbose_name="currency of your balance",
        to=CurrencyModel,
        on_delete=models.PROTECT,
    )
