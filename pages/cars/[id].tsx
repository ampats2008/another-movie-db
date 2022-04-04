import { useRouter } from "next/router"
import React from "react";

export default function CarsList() {
    const router = useRouter();
    const {id} = router.query;

    return <h1>CarsList {id}</h1>
}