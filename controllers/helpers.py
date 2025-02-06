import flet as ft


def __show_snackbar(
    page: ft.Page, message: str, message_color: str, bgcolor: str
) -> None:
    page.open(ft.SnackBar(ft.Text(message, color=message_color), bgcolor=bgcolor))


def success_snackbar(page: ft.Page, message: str) -> None:
    color = "tertiary"
    __show_snackbar(page, message, f"on{color}", color)


def error_snackbar(page: ft.Page, message: str) -> None:
    color = "error"
    __show_snackbar(page, message, f"on{color}", color)
