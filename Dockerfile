FROM centos:centos7

MAINTAINER SIMSAB

WORKDIR /opt

RUN yum -y update; yum clean all
RUN yum -y install git; yum clean all
RUN yum -y install sudo; yum clean all
RUN yum -y install epel-release; yum clean all
RUN yum -y install python-pip; yum clean all
RUN git clone https://github.com/simsab-ufcg/geonode.git

WORKDIR /opt/geonode

RUN pip install --upgrade pip \
    && pip install -r requirements.txt --upgrade \
    && python manage.py makemigrations --settings=geonode.settings \
    && python manage.py migrate --settings=geonode.settings

EXPOSE 8000

ENTRYPOINT ["/entrypoint.sh"]