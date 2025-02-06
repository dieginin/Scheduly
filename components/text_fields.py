import flet as ft


class __TextField(ft.TextField):
    def __init__(
        self,
        label: str | None = None,
        autofocus: bool | None = None,
        on_change=None,
        on_click=None,
        on_submit=None,
        on_focus=None,
        on_blur=None,
    ) -> None:
        super().__init__()
        self.label = label
        self.autofocus = autofocus
        self.on_change = on_change
        self.on_click = on_click
        self.on_submit = on_submit
        self.on_focus = on_focus
        self.on_blur = on_blur
        self.border = ft.InputBorder.UNDERLINE
        self.focused_border_width = 3


class EmailField(__TextField):
    def __init__(
        self,
        label: str | None = None,
        autofocus: bool | None = None,
        on_change=None,
        on_click=None,
        on_submit=None,
        on_focus=None,
        on_blur=None,
    ) -> None:
        super().__init__(
            label, autofocus, on_change, on_click, on_submit, on_focus, on_blur
        )
        self.autocorrect = False
        self.keyboard_type = ft.KeyboardType.EMAIL


class PasswordField(__TextField):
    def __init__(
        self,
        label: str | None = None,
        autofocus: bool | None = None,
        on_change=None,
        on_click=None,
        on_submit=None,
        on_focus=None,
        on_blur=None,
    ) -> None:
        super().__init__(
            label, autofocus, on_change, on_click, on_submit, on_focus, on_blur
        )
        self.autocorrect = False
        self.password = True
        self.can_reveal_password = True
        self.keyboard_type = ft.KeyboardType.VISIBLE_PASSWORD
