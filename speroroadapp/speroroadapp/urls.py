from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
from uuid import uuid4

urlpatterns = patterns('roads.views',
	url(r'^speroroadapp/(?P<ident>\d+)/$','roads_view.rest'),
	url(r'^upload/(?P<ident>\d+)/$', 'roads_view.upload'),
	url(r'^export/(?P<ident>\d+)/$', 'roads_view.export_csv'),
	url(r'^$','roads_view.index'),
) + static(settings.STATIC_URL, document_root=settings.STATIC_URL)

urlpatterns += patterns('', 
	url(r'^media/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': settings.MEDIA_ROOT, 'show_indexes': True, })
)
