from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login_view, name="api_login"),
    path("logout/", views.logout_view, name="logout_view"),
    path("session/", views.session_view, name="session_view"),
    path("whoami/", views.whoami_view, name="whoami_view"),
]