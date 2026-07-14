const CACHE = "krisalida-v3";

const ARCHIVOS = [

    "./",

    "./index.html",

    "./manifest.json",

    "./css/estilos.css",

    "./js/app.js",

    "./js/firebase.js"

];


/* INSTALAR Y GUARDAR LA WEB */

self.addEventListener(

    "install",

    evento=>{

        evento.waitUntil(

            caches

            .open(CACHE)

            .then(

                cache=>

                    cache.addAll(

                        ARCHIVOS

                    )

            )

        );


        self.skipWaiting();

    }

);


/* BORRAR CACHÉ ANTIGUA */

self.addEventListener(

    "activate",

    evento=>{

        evento.waitUntil(

            caches

            .keys()

            .then(

                nombres=>

                    Promise.all(

                        nombres

                        .filter(

                            nombre=>

                                nombre!==CACHE

                        )

                        .map(

                            nombre=>

                                caches.delete(

                                    nombre

                                )

                        )

                    )

            )

        );


        self.clients.claim();

    }

);


/* FUNCIONAR SIN INTERNET */

self.addEventListener(

    "fetch",

    evento=>{


        const url =

            new URL(

                evento.request.url

            );


        /* NO GUARDAR FIREBASE */

        if(

            url.hostname.includes(

                "googleapis.com"

            )

            ||

            url.hostname.includes(

                "firebase"

            )

            ||

            url.hostname.includes(

                "gstatic.com"

            )

        ){

            return;

        }


        /* SOLO PETICIONES GET */

        if(

            evento.request.method

            !==

            "GET"

        ){

            return;

        }


        evento.respondWith(

            caches

            .match(

                evento.request

            )

            .then(

                archivoGuardado=>{


                    if(

                        archivoGuardado

                    ){

                        return archivoGuardado;

                    }


                    return fetch(

                        evento.request

                    )

                    .then(

                        respuesta=>{


                            if(

                                !respuesta

                                ||

                                respuesta.status!==200

                            ){

                                return respuesta;

                            }


                            const copia =

                                respuesta.clone();


                            caches

                            .open(CACHE)

                            .then(

                                cache=>{

                                    cache.put(

                                        evento.request,

                                        copia

                                    );

                                }

                            );


                            return respuesta;

                        }

                    )

                    .catch(

                        ()=>{

                            return caches.match(

                                "./index.html"

                            );

                        }

                    );

                }

            )

        );

    }

);