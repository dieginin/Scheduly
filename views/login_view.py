import re

import flet as ft

from components import EmailField, PasswordField, PrimaryButton, SecondaryButton
from controllers import Firebase, error_snackbar, success_snackbar


class LoginView(ft.View):
    def __init__(self) -> None:
        super().__init__()
        self.route = "/login"

        self.fb = Firebase()

        self.__init_components__()

    def __init_components__(self) -> None:
        self.logo = ft.Image(
            src="logo.png",
            width=300,
            height=300,
            animate_size=ft.animation.Animation(500, ft.AnimationCurve.EASE_OUT_BACK),
        )
        title = ft.Text("Please login or register", size=40, color="outline")

        self.email = EmailField(
            "Email",
            on_focus=self.__logo_onfocus,
            on_blur=self.__logo_onblur,
            on_submit=self.__sign_in,
        )
        self.password = PasswordField(
            "Password",
            on_focus=self.__logo_onfocus,
            on_blur=self.__logo_onblur,
            on_submit=self.__sign_in,
        )

        fields_section = ft.Column(
            [self.email, self.password],
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
                    [
                        self.logo,
                        title,
                        fields_section,
                        buttons_section,
                        ft.TextButton("Reset password", on_click=self.__reset_password),
                    ],
                    horizontal_alignment=ft.CrossAxisAlignment.CENTER,
                    spacing=35,
                    scroll=ft.ScrollMode.HIDDEN,
                ),
                expand=True,
            )
        ]

    def __sign_in(self, e: ft.ControlEvent) -> None:
        email = self.email.value
        password = self.password.value

        if not email:
            return self.email.focus()
        elif not password:
            return self.password.focus()

        if not re.match(r"[^@\s]+@[^@\s]+\.[a-zA-Z0-9]+$", email):
            error_snackbar(e.page, "Enter a valid email")
            return self.email.focus()

        response = self.fb.sign_in(email.strip(), password.strip())

        if response.status == "Success":
            e.page.client_storage.set("token", response.data)
            e.page.go("/")
            e.page.update()
            success_snackbar(e.page, response.message)
        else:
            error_snackbar(e.page, response.message)

    def __sign_up(self, e: ft.ControlEvent) -> None:
        e.page.go("/register")
        e.page.update()

    def __reset_password(self, e: ft.ControlEvent) -> None:
        e.page.go("/reset")
        e.page.update()

    def __logo_onfocus(self, _) -> None:
        self.logo.width = 150
        self.logo.height = 150
        self.logo.update()

    def __logo_onblur(self, _) -> None:
        self.logo.width = 300
        self.logo.height = 300
        self.logo.update()
