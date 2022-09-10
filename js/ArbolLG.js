
class ArbolLG{
    #raiz = null;
    #string;

    ArbolLG(){
    }
    get raiz(){
        return this.#raiz
    }
    set raiz(raiz){
        this.#raiz = raiz
    }
    get string(){
        return this.#string;
    }
    set string(string){
        this.#string = string;
    }

    construyeArbol(s){
        /*
        TODO Faltan las validaciones
        */
        let newS = s.replace(/\s+/g, '');
        let contParenthesis = 0;
        let pila = new Pila();
        this.string = newS;
        this.raiz = new NodoLg(null);
        this.raiz.asignaDato(newS[1]);
        if(newS.length === 2){
            return
        }
        let x = new NodoLg(null);
        this.raiz.asignaLiga(x);
        let ultimo = x;
        for(let i = 3; i <= newS.length - 2; i++){
            switch(newS[i]){
                case '(':
                    contParenthesis++
                    x = new NodoLg(null);
                    ultimo.asignaSw(1);
                    x.asignaDato(ultimo.retornaDato());
                    ultimo.asignaDato(x);
                    pila.apilar(ultimo);
                    ultimo = new NodoLg(null);
                    x.asignaLiga(ultimo);
                    break
                case ",":
                    x = new NodoLg(null);
                    ultimo.asignaLiga(x);
                    ultimo = x;
                    break
                case ')':
                    ultimo = pila.desapilar();
                    contParenthesis--
                    break
                default:
                    ultimo.asignaDato(newS[i]);
            }
        }
    }

    muestraArbol(){
        let pila = [];
        let p = this.raiz;
        while(pila.length !== 0 || p != null){
            if(p === null){
                p = pila.pop()
            }else{
                if(p.retornaSw() === 1){
                    pila.push(p);
                    p = p.retornaDato()
                }
                console.log(p.retornaDato())
            }
            p = p.retornaLiga();
        }
    }

    ancestros(e){
        let pilaRecorrido = [];
        let pilaAncestros = [];
        let p = this.raiz;
        pilaAncestros.push(p.retornaDato());
        while(pilaRecorrido.length !== 0 || p !== null){
            if(p === null){
                p = pilaRecorrido.pop();
                pilaAncestros.pop();
            }else{
                if(p.retornaSw() === 1){
                    pilaRecorrido.push(p);
                    p = p.retornaDato();
                    if(p.retornaDato() === e) break
                    else{
                        pilaAncestros.push(p.retornaDato());
                    }
                }else{
                    if(p.retornaDato() === e) break
                }
            }
            p = p.retornaLiga();
        }
        let str = ''
        while(pilaAncestros.length !== 0){
            if(pilaAncestros.length === 1){
                str = `${str}${pilaAncestros.pop()}`;
            }else{
                str = `${str}${pilaAncestros.pop()}, `;
            }
        }
        return str
    }

    buscarDato(d){
        let pila = [];
        let p = this.raiz;
        while(pila.length !== 0 || p != null){
            if(p === null){
                p = pila.pop()
            }else{
                if(p.retornaSw() === 1){
                    pila.push(p);
                    p = p.retornaDato()
                }
                if(p.retornaDato() === d){
                    return p
                }
            }
            p = p.retornaLiga();
        }
        return 'Dato no encontrado';
    }

    elementoEsPadre(d){
        let pila = [];
        let p = this.#raiz;
        if(d === p.retornaDato()) return true;
        let bandera = false;
        while(pila.length !== 0 || p !== null){
            bandera = false;
            if(p === null){
                p = pila.pop()
            }else{
                if(p.retornaSw() === 1){
                    pila.push(p);
                    p = p.retornaDato()
                    bandera = true;
                }
                if(p.retornaDato() === d){
                    return bandera;
                }
            }
            p = p.retornaLiga();
        }
    }

    grado(){
        let q;
        let pila = [];
        let p = this.#raiz;
        let grado = 0;
        q = p.retornaLiga();
        while(q !== null){
            grado++;
            q = q.retornaLiga();
        }
        let maxGrado = grado;
        while(pila.length !== 0 || p != null){
            grado = 0;
            if(p === null){
                p = pila.pop()
            }else{
                if(p.retornaSw() === 1){
                    pila.push(p);
                    p = p.retornaDato();
                    q = p.retornaLiga()
                    while(q !== null){
                        grado++;
                        q = q.retornaLiga();
                    }
                    if(grado > maxGrado){
                        maxGrado = grado;
                    }
                }
            }
            p = p.retornaLiga();
        }
        return maxGrado
    }

    gradoElemento(el){
        let pila = []
        let p = this.raiz;
        let grado = 0;
        if(el === p.retornaDato()){
            while(p !== null){
                grado++
                p = p.retornaLiga()
            }
            return grado - 1;
        }
        while(pila.length !== 0 || p !== null){
            if(p===null){
                p = pila.pop();
            }else{
                if(p.retornaSw()=== 1){
                    pila.push(p);
                    p = p.retornaDato()
                    if(p.retornaDato() === el){
                        p = p.retornaLiga();
                        while(p !== null){
                            grado++
                            p = p.retornaLiga()
                        }
                        return grado;
                    }
                }
                if(p.retornaDato() === el){
                    return grado;
                }
            }
            p = p.retornaLiga()
        }
    }
}



