import re

import flet as ft

from components import EmailField, PasswordField, PrimaryButton, SecondaryButton
from controllers import Firebase, error_snackbar, success_snackbar


class RegisterView(ft.View):
    def __init__(self) -> None:
        super().__init__()
        self.route = "/register"

        self.fb = Firebase()

        self.__init_components__()

    def __init_components__(self) -> None:
        self.logo = ft.Image(
            src="logo.png",
            width=200,
            height=200,
            animate_size=ft.animation.Animation(500, ft.AnimationCurve.EASE_OUT_BACK),
        )
        title = ft.Text("Please create an account", size=40, color="outline")

        self.email = EmailField(
            "Email",
            on_focus=self.__logo_onfocus,
            on_blur=self.__logo_onblur,
            on_submit=self.__sign_up,
        )
        self.repeatemail = EmailField(
            "Repeat Email",
            on_focus=self.__logo_onfocus,
            on_blur=self.__logo_onblur,
            on_submit=self.__sign_up,
        )
        self.password = PasswordField(
            "Password",
            on_focus=self.__logo_onfocus,
            on_blur=self.__logo_onblur,
            on_submit=self.__sign_up,
        )
        self.repeatpassword = PasswordField(
            "Repeat Password",
            on_focus=self.__logo_onfocus,
            on_blur=self.__logo_onblur,
            on_submit=self.__sign_up,
        )

        fields_section = ft.Column(
            [self.email, self.repeatemail, self.password, self.repeatpassword],
            horizontal_alignment=ft.CrossAxisAlignment.CENTER,
            spacing=15,
        )
        buttons_section = ft.Row(
            [
                PrimaryButton("Login", on_click=self.__sign_in),
                SecondaryButton("Register", on_click=self.__sign_up),
            ],
            ft.MainAxisAlignment.SPACE_EVENLY,
        )
        self.controls = [
            ft.SafeArea(
                ft.Column(
                    [self.logo, title, fields_section, buttons_section],
                    horizontal_alignment=ft.CrossAxisAlignment.CENTER,
                    spacing=35,
                    scroll=ft.ScrollMode.HIDDEN,
                ),
                expand=True,
            )
        ]

    def __sign_in(self, e: ft.ControlEvent) -> None:
        e.page.go("/login")
        e.page.update()

    def __sign_up(self, e: ft.ControlEvent) -> None:
        email = self.email.value
        repeatemail = self.repeatemail.value
        password = self.password.value
        repeatpassword = self.repeatpassword.value

        if not email:
            return self.email.focus()
        if not repeatemail:
            return self.repeatemail.focus()
        elif not password:
            return self.password.focus()
        if not repeatpassword:
            return self.repeatpassword.focus()

        if not re.match(r"[^@\s]+@[^@\s]+\.[a-zA-Z0-9]+$", email):
            error_snackbar(e.page, "Enter a valid email")
            return self.email.focus()

        if len(password) < 6:
            error_snackbar(e.page, "Password must be 6 characters at last")
            return self.password.focus()
        if len(repeatpassword) < 6:
            error_snackbar(e.page, "Password must be 6 characters at last")
            return self.repeatpassword.focus()

        if email != repeatemail:
            error_snackbar(e.page, "Emails doesn't match")
            return self.repeatemail.focus()
        if password != repeatpassword:
            error_snackbar(e.page, "Passwords doesn't match")
            return self.repeatpassword.focus()

        response = self.fb.sign_up(email.strip(), password.strip())

        if response.status == "Success":
            e.page.client_storage.set("token", response.data)
            e.page.go("/")
            e.page.update()
            success_snackbar(e.page, response.message)
        else:
            error_snackbar(e.page, response.message)

    def __logo_onfocus(self, _) -> None:
        self.logo.width = 100
        self.logo.height = 100
        self.logo.update()

    def __logo_onblur(self, _) -> None:
        self.logo.width = 200
        self.logo.height = 200
        self.logo.update()
