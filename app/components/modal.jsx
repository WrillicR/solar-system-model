"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect, useRef } from "react";

export default function Modal(props) {

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                props.close();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <div className={props.visible ? "" : "hidden"}>
            <div className="z-30 fixed top-0 right-0 w-full h-full bg-opacity-75 bg-black"></div>
            <div className="fixed top-0 right-0 w-full h-full z-40 flex justify-center items-center">
                <div className="bg-slate-900 border border-slate-800 p-8 relative m-8 w-full max-w-3xl" ref={modalRef}>
                    <span className="absolute -right-2 -top-2 bg-rose-500 text-white hover:bg-rose-200 hover:text-rose-800 cursor-pointer transition-colors rounded-full" style={{width: 22, height: 22, paddingLeft: 3}} onClick={props.close}><i className="bi bi-x"></i></span>
                    {props.children}
                </div>
            </div>
        </div>
    )
}