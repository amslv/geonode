FROM centos:centos7

MAINTAINER SIMSAB

WORKDIR /opt

RUN yum clean all && yum install -y \
    python-pip \
    git \
    sudo \
    && rm -rf /var/cache/yum   \
    && git clone https://github.com/simsab-ufcg/geonode

WORKDIR /opt/geonode

RUN pip install --upgrade pip \
    && pip install -r requirements.txt --upgrade \
    && python manage.py makemigrations --settings=geonode.settings \
    && python manage.py migrate --settings=geonode.settings \
    && python manage.py runserver

EXPOSE 8000

CMD ["uwsgi", "--ini", "uwsgi.ini"]