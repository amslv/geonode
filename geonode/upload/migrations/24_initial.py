# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import now
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('layers', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Upload',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('import_id', models.BigIntegerField(null=True)),
                ('state', models.CharField(max_length=255)),
                ('date', models.DateTimeField(default=now, verbose_name=b'date')),
                ('upload_dir', models.CharField(max_length=255, null=True)),
                ('name', models.CharField(max_length=255, null=True)),
                ('complete', models.BooleanField(default=False)),
                ('session', models.TextField(null=True)),
                ('metadata', models.TextField(null=True)),
                ('mosaic_time_regex', models.CharField(max_length=128, null=True)),
                ('mosaic_time_value', models.CharField(max_length=128, null=True)),
                ('mosaic_elev_regex', models.CharField(max_length=128, null=True)),
                ('mosaic_elev_value', models.CharField(max_length=128, null=True)),
                ('layer', models.ForeignKey(to='layers.Layer', null=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
                'ordering': ['-date'],
            },
        ),
        migrations.CreateModel(
            name='UploadFile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('file', models.FileField(upload_to=b'uploads')),
                ('slug', models.SlugField(blank=True)),
                ('upload', models.ForeignKey(blank=True, to='upload.Upload', null=True)),
            ],
        ),
    ]
