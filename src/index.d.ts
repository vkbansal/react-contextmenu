declare module "react-contextmenu" {
    import * as React from "react";

    interface ContextMenuProps {
        id: string,
        data?: any,
        className?: string,
        hideOnLeave?: boolean,
        onHide?: {(event: any): void},
        onMouseLeave?: {(event: React.MouseEvent<HTMLElement>, data: Object, target: HTMLElement): void} | Function,
        onShow?: {(event: any): void},
    }

    interface ContextMenuTriggerProps {
        id: string,
        attributes?: React.HTMLAttributes<any>,
        collect?: {(data: any): any},
        disable?: boolean,
        holdToDisplay?: number,
        renderTag?: React.ReactType,
    }

    interface MenuItemProps {
        attributes?: React.HTMLAttributes<HTMLDivElement>,
        data?: Object,
        disabled?: boolean,
        divider?: boolean,
        preventClose?: boolean,
        onClick?: {(event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>, data: Object, target: HTMLElement): void} | Function,
    }

    interface SubMenuProps {
        title: React.ReactElement<any>,
        className?: string,
        disabled?: boolean,
        hoverDelay?: number,
        rtl?: boolean,
    }

    module ReactContextmenu {
        export const ContextMenu: React.ComponentClass<ContextMenuProps>;
        export const ContextMenuTrigger: React.ComponentClass<ContextMenuTriggerProps>;
        export const MenuItem: React.ComponentClass<MenuItemProps>;
        export const SubMenu: React.ComponentClass<SubMenuProps>;
        export function connectMenu(menuId: string): (menu: any) => any;
        export function showMenu(opts?: any, target?: HTMLElement): void;
        export function hideMenu(opts?: any, target?: HTMLElement): void;
    }

    export = ReactContextmenu;
}

declare module "react-contextmenu/modules/actions" {
    module ReactContextmenuActions {
        export function showMenu(opts?: any, target?: HTMLElement): void;
        export function hideMenu(opts?: any, target?: HTMLElement): void;
    }

    export = ReactContextmenuActions;
}
