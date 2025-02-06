import flet as ft

from controllers import Router


class Main:
    def __init__(self, page: ft.Page) -> None:
        super().__init__()

        page.title = "Scheduly"
        Router(page)


ft.app(Main, assets_dir="assets")
