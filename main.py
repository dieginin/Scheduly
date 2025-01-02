import flet as ft

from services import Router


class Main:
    def __init__(self, page: ft.Page):
        super().__init__()

        page.title = "Scheduly"
        page.theme = ft.Theme(color_scheme_seed=ft.Colors.AMBER)

        Router(page)


ft.app(Main)
