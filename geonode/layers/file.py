def get_download_url(layer_url):
    slug = layer_url.split(':')
    final_slug_name = slug[1]
    if 'imd' in final_slug_name:
        url = 'http://transferserver.insa.gov.br/SADES/OUTPUT/' + final_slug_name.upper() + '/' + final_slug_name + '.tif'
    else:
        url = 'http://transferserver.insa.gov.br/SADES/INPUT/' + final_slug_name.upper() + '/' + final_slug_name + '.zip'
    print url