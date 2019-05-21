from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from api.gs_python.main import main
import json



# This will return a list of books
@api_view(["GET"])
def book(request):
    books = ["Pro Python", "Fluent Python", "Speaking javascript", "Nicolas ist der Beste", "The Go programming language"]
    return Response(status=status.HTTP_200_OK, data={"data": books})
	
	
@api_view(["POST"])
def postLatLng(request):
	if request.method == 'POST':
		info = json.dumps(request.data, ensure_ascii=False)
		decode = json.loads(info)
		d_lat = decode['cords']['d_lat']
		d_lng = decode['cords']['d_lng']
		a_lat = decode['cords']['a_lat']
		a_lng = decode['cords']['a_lng']
		transport_data = main(d_lng,d_lat,a_lng,a_lat).create_json()
##		print(data)
		return Response(status=status.HTTP_200_OK, data={"data": transport_data})