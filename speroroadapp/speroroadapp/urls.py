from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = patterns('roads.views',
	
	url(r'^$','roadsview.rest'),

	
) + static(settings.STATIC_URL, document_root=settings.STATIC_URL)