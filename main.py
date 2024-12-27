import flet as ft

from services import Router


class Main:
    def __init__(self, page: ft.Page):
        super().__init__()

        page.title = "Scheduly"
        Router(page)


ft.app(Main)
