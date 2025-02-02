# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0032_auto_20180329_1844'),
    ]

    operations = [
        migrations.AlterField(
            model_name='region',
            name='srid',
            field=models.CharField(default=b'EPSG:4326', max_length=255),
        ),
        migrations.AlterField(
            model_name='resourcebase',
            name='srid',
            field=models.CharField(default=b'EPSG:4326', max_length=255),
        ),
    ]
