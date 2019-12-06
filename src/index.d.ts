declare module "react-contextmenu" {
    import * as React from "react";

    export interface ContextMenuProps {
        id: string,
        data?: any,
        className?: string,
        hideOnLeave?: boolean,
        rtl?: boolean,
        onHide?: {(event: any): void},
        onMouseLeave?: {(event: React.MouseEvent<HTMLElement>, data: Object, target: HTMLElement): void} | Function,
        onShow?: {(event: any): void},
    }

    export interface ContextMenuTriggerProps {
        id: string,
        attributes?: React.HTMLAttributes<any>,
        collect?: {(data: any): any},
        disable?: boolean,
        holdToDisplay?: number,
        renderTag?: React.ReactType,
        mouseButton?: number,
        disableIfShiftIsPressed?: boolean,
    }

    export interface MenuItemProps {
        attributes?: React.HTMLAttributes<HTMLDivElement>,
        className?: string;
        data?: Object,
        disabled?: boolean,
        divider?: boolean,
        preventClose?: boolean,
        onClick?: {(event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>, data: Object, target: HTMLElement): void} | Function,
    }

    export interface SubMenuProps {
        title: React.ReactElement<any> | React.ReactText,
        className?: string,
        disabled?: boolean,
        hoverDelay?: number,
        rtl?: boolean,
        preventCloseOnClick?: boolean,
        onClick?: {(event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>, data: Object, target: HTMLElement): void} | Function,
    }

    export const ContextMenu: React.ComponentClass<ContextMenuProps>;
    export const ContextMenuTrigger: React.ComponentClass<ContextMenuTriggerProps>;
    export const MenuItem: React.ComponentClass<MenuItemProps>;
    export const SubMenu: React.ComponentClass<SubMenuProps>;
    export function connectMenu(menuId: string): (menu: any) => any;
    export function showMenu(opts?: any, target?: HTMLElement): void;
    export function hideMenu(opts?: any, target?: HTMLElement): void;
}

declare module "react-contextmenu/modules/actions" {
    export function showMenu(opts?: any, target?: HTMLElement): void;
    export function hideMenu(opts?: any, target?: HTMLElement): void;
}
