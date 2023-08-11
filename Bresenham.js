function logic_bresenham(x0, y0, x1, y1) {
    /**
     * 
     * @param {Constante} dx   Math.abs(x1 - x0);
     * @param {Constante} dy   Math.abs(y1 - y0);
     * @param {Constante} xsign   x1 - x0 > 0 ? 1 : -1;  // x1 - x0 est récuperé de dx
     * @param {Constante} ysign   y1 - y0 > 0 ? 1 : -1;  // y1 - y0 est récuperé de dy
     * 
     * @param {Constante} xx xsign || 0
     * @param {Constante} xy 0 || ysign
     * @param {Constante} yx 0 || xsign
     * @param {Constante} yy ysign || 0
     * 
     * @param {Constante} DY Math.min(dx,dy);
     * @param {Constante} DX Math.max(dx,dy);
     * @param {Constante} xs x0;
     * @param {Constante} ys y0;
     * 
     * 
     * @param {Incrementor} x   incrementeur de la boucle for;
     * @param {Incrementor} y   incrementeur de la condition D > 0; Pour calcul du décalage
     * 
     * 
     * @param {Module} abs valeur absolue de x
     * @param {Module} min valeur la plus petite entre A et B
     * @param {Module} max valeur la plus grande entre A et B
    */

    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
  
    const xsign = x1 - x0 > 0 ? 1 : -1; // > 0 --> Not(A) And Or(All\A)
    const ysign = y1 - y0 > 0 ? 1 : -1;

    const xx = (dx > dy)*xsign;  // Magnitude comparator OU Substractor
    const xy = (!(dx > dy))*ysign;  // Les * Sont dess AND généraux.
    const yx = (!(dx > dy))*xsign;  // Dans l'idée , générer le code optimisé de l'addition
    const yy = (dx > dy)*ysign;  // Invalide pour le cas égal lors des inférieurs
    // Dans l'idée , générer le code optimisé de l'addition
    // Et dans les inputs faire un AND gate avec la condition et son inverse

    // ! remember after this line that dy = min(dx,dy), dx = max(dx,dy)
    const DY = Math.min(dx,dy);
    const DX = Math.max(dx,dy);

    const xs = x0;
    const ys = y0;
  
    const dstart = (DY - DX);

    /*
        var D = 0;  dstart + (x - y) * (2 * dx)
        
        D = dstart + 2*(x*dy - y*dx)

        dstart correspond à la valeur initiale de D,
        puis on construit un incrementeur autour du if 
        enfin on prend la valeur x de l'incrementeur qui sert de boucle

        x * (2*dy) - y * (2*dx)
        2*(x*dy) - 2(y-dx)
        2*(x*dy - y*dx)


    */

    const y = new Incrementor();
    const result = [];
  
    for (const x = new Incrementor(); !(x.get() == DX); x.trigger()) {
        const pixel = [
            xs  +  x.get()*xx  +  y.get()*yx,
            ys  +  x.get()*xy  +  y.get()*yy  
        ];
        result.push(pixel);

        /* La condition IF implique une asynchronitée des actions
        *
        * Callback Timer (0.10s)
        * Déclenchement du trigger  via un AND(trigger, condition)
        * 
        * Boucle -> Pixel.
        *        -> AND condition -> False.
        *                         -> True   -> déclenchement de l'incrementeur Y.
        *        -> Timer (0.10s)
        *
        * 32 * 16 * 0.10
        * 
        * 1frame / 51,2s 
        * 
        * 
        */
        if (dstart + (x.get()*DY - y.get()*DX) >= 0) {  // >= 0  est juste une condition sur le 1er bit
            y.trigger();
        };
    };
    return result;
};