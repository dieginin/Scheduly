import re

import flet as ft

from components import EmailField, PrimaryButton
from controllers import Firebase, error_snackbar, success_snackbar


class ResetView(ft.View):
    def __init__(self) -> None:
        super().__init__()
        self.route = "/reset"

        self.fb = Firebase()

        self.__init_components__()

    def __init_components__(self) -> None:
        self.logo = ft.Image(
            src="logo.png",
            width=300,
            height=300,
            animate_size=ft.animation.Animation(500, ft.AnimationCurve.EASE_OUT_BACK),
        )
        title = ft.Text("Please enter an email", size=40, color="outline")

        self.email = EmailField("Email", on_submit=self.__reset_password)

        self.controls = [
            ft.SafeArea(
                ft.Column(
                    [
                        self.logo,
                        title,
                        self.email,
                        PrimaryButton("Reset password", on_click=self.__reset_password),
                    ],
                    horizontal_alignment=ft.CrossAxisAlignment.CENTER,
                    spacing=35,
                    scroll=ft.ScrollMode.HIDDEN,
                ),
                expand=True,
            )
        ]

    def __reset_password(self, e: ft.ControlEvent) -> None:
        email = self.email.value
        if not email:
            return self.email.focus()

        if not re.match(r"[^@\s]+@[^@\s]+\.[a-zA-Z0-9]+$", email):
            error_snackbar(e.page, "Enter a valid email")
            return self.email.focus()
        response = self.fb.reset_password(email)

        if response.status == "Success":
            e.page.go("/login")
            e.page.update()
            success_snackbar(e.page, response.message)
        else:
            error_snackbar(e.page, response.message)
