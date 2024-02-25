from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model
# from django.utils.translation import ugettext_lazy as _

User = get_user_model()

class BootstrapStyleFormMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs.update({'class':'form-control'})
            

class RegisterForm(BootstrapStyleFormMixin, UserCreationForm):
    email = forms.EmailField(label='Email Address', max_length=254)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
        labels = {
            'username':'Username',
            'password1': 'Password',
            'password2': 'Confirm Password',
        }
    # def __init__(self, *args, **kwargs):
    #     super(UserCreationForm, self).__init__(*args, **kwargs)
    #     for fieldname in ['username', 'email', 'password1', 'password2']:
    #         self.fields[fieldname].help_text = None

class LoginForm(BootstrapStyleFormMixin, AuthenticationForm):
    class Meta:
        model = User
        fields = ['username', 'password']
        labels = {
            'username': 'Username',
            'password': 'Password',
        }