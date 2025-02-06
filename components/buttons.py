import flet as ft


class __Button(ft.ElevatedButton):
    def __init__(
        self,
        text: str | None = None,
        autofocus: bool | None = None,
        on_click=None,
        disabled: bool | None = None,
    ) -> None:
        super().__init__()
        self.text = text
        self.autofocus = autofocus
        self.on_click = on_click
        self.disabled = disabled
        self.height = 45
        self.width = 185


class PrimaryButton(__Button):
    def __init__(
        self,
        text: str | None = None,
        autofocus: bool | None = None,
        on_click=None,
        disabled: bool | None = None,
    ) -> None:
        super().__init__(text, autofocus, on_click, disabled)
        self.style = ft.ButtonStyle(
            color="onprimary",
            bgcolor="primary",
            overlay_color="primarycontainer,.1",
        )


class PrimaryButtonLight(__Button):
    def __init__(
        self,
        text: str | None = None,
        autofocus: bool | None = None,
        on_click=None,
        disabled: bool | None = None,
    ) -> None:
        super().__init__(text, autofocus, on_click, disabled)
        self.style = ft.ButtonStyle(
            color="onprimarycontainer",
            bgcolor="primarycontainer",
            overlay_color="primary,.1",
        )


class SecondaryButton(__Button):
    def __init__(
        self,
        text: str | None = None,
        autofocus: bool | None = None,
        on_click=None,
        disabled: bool | None = None,
    ) -> None:
        super().__init__(text, autofocus, on_click, disabled)
        self.style = ft.ButtonStyle(
            color="onsecondary",
            bgcolor="secondary",
            overlay_color="secondarycontainer,.1",
        )


class SecondaryButtonLight(__Button):
    def __init__(
        self,
        text: str | None = None,
        autofocus: bool | None = None,
        on_click=None,
        disabled: bool | None = None,
    ) -> None:
        super().__init__(text, autofocus, on_click, disabled)
        self.style = ft.ButtonStyle(
            color="onsecondarycontainer",
            bgcolor="secondarycontainer",
            overlay_color="secondary,.1",
        )


class TertiaryButton(__Button):
    def __init__(
        self,
        text: str | None = None,
        autofocus: bool | None = None,
        on_click=None,
        disabled: bool | None = None,
    ) -> None:
        super().__init__(text, autofocus, on_click, disabled)
        self.style = ft.ButtonStyle(
            color="ontertiary",
            bgcolor="tertiary",
            overlay_color="tertiarycontainer,.1",
        )


class TertiaryButtonLight(__Button):
    def __init__(
        self,
        text: str | None = None,
        autofocus: bool | None = None,
        on_click=None,
        disabled: bool | None = None,
    ) -> None:
        super().__init__(text, autofocus, on_click, disabled)
        self.style = ft.ButtonStyle(
            color="ontertiarycontainer",
            bgcolor="tertiarycontainer",
            overlay_color="tertiary,.1",
        )
