# views.py
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import CarAd
from django.contrib.auth.decorators import login_required

@require_POST
@login_required
def like_car_ad(request, ad_id):
    ad = CarAd.objects.get(id=ad_id)
    user = request.user
    if user in ad.likes.all():
        ad.likes.remove(user)  # Agar user like qilgan bo'lsa, like'ni olib tashlaydi
        liked = False
    else:
        ad.likes.add(user)  # Agar like qilmagan bo'lsa, like qiladi
        liked = True
    return JsonResponse({'liked': liked, 'total_likes': ad.likes.count()})

def view_car_ad(request, ad_id):
    ad = CarAd.objects.get(id=ad_id)
    ad.views += 1  # Har safar sahifa yuklanganida view sonini oshiradi
    ad.save()
    return JsonResponse({'total_views': ad.views})
