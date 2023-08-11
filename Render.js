/**
 *             ENVIRONNEMENT
 * ---------------------------------------
 * 
 * 
 * -- Camera --
 * 
 * @param {Constante} pos_x_source Position X d'origine
 * @param {Constante} pos_y_source Position Y d'origine
 * @param {Constante} origin Position d'origine
 * @param {Constante} pos_x pos_x_source+ pos_x*pos_delta_x
 * @param {Constante} pos_y pos_y_source+ pos_y*pos_delta_y
 * @param {Incrementor} pos_x Nombre de décalage à droite / gauche
 * @param {Incrementor} pos_y Nombre de décalage en haut / bas
 * 
 * ------------
 * 
 * 
 * 
 * -- Map --
 * 
 * @param {Constante} map Dictionnaire de valeur contenant les murs
 * @param {Constante} mapX Taille X de la map
 * @param {Constante} mapY Taille Y de la map
 * @param {Constante} mapS Taille totale de la map
 * 
 * ---------
 * 
 * 
 * 
 * -- Math --
 * @param {Constante} P1  Math.PI;
 * @param {Constante} P2  P1/2;
 * @param {Constante} P3  3*P1/2;
 * @param {Constante} DR  0.017;
 * 
 * ----------
 * 
 */

const mouvement = 5;
const pos_x_source = 300;
const pos_y_source = 300;

const pos_x = 300
const pos_y = 300
var pangle = 0;

const map = [
    1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,1,
    1,0,1,0,0,0,0,1,
    1,0,1,0,0,1,0,1,
    1,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,1,
    1,0,0,0,1,0,0,1,
    1,1,1,1,1,1,1,1,
];
const mapX = 8;
const mapY = 8;
const mapS = 64;

const P1 = 3.14;
const P2 = P1/2;
const P3 = 3*P1/2;
const DR = 0.017;

const origin = [4,4];


// Dessin visuel de la carte non obligatoire
const canvas = document.querySelectorAll('canvas')[0];
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const ecran = document.querySelectorAll('canvas')[1];
const context = ecran.getContext('2d');
ecran.width = 512;
ecran.height = 512;

const offset = 1;
// ------------------------------------------


function bresenham(cont, x0, y0, x1, y1, style) {
    cont.beginPath();
    cont.strokeStyle = style;
    cont.moveTo(x0, y0);
    cont.lineTo(x1, y1);
    cont.stroke();
    return true;
};

const dist = (ax, ay, bx, by) => Math.sqrt((bx-ax)**2 + (by-ay)**2);

function to_pi(value) {
    return value+(P1<<2)%(P1<<2);
};

function raycast(nb_cast) {
    var rx, ry, xo, yo;
    const const_ra = to_pi(pangle-DR*nb_cast);

    for (let r = 0; r < nb_cast<<1; r++) {
        const ra = to_pi(const_ra+DR*(r-1));
        const Tan = -Math.tan(ra);

        // Horizontal

        dof = 0;
        var disH = Infinity, hx=pos_x, hy=pos_y;
        const aTan = 1/Tan;

        ry = pos_y;
        

        if(ra > P1){
            // Only take the 6 firsts Bit for >> 6 << 6
            ry = ((pos_y>>6)<<6) - 0.0001;
            yo = -64;
        };

        if(ra < P1){
            ry = ((pos_y>>6)<<6) + 64;
            yo = 64;
        };


        rx = (pos_y-ry) * aTan+pos_x;
        xo = -yo*aTan;


        if(ra == 0 || ra == P1){
            dof = 8;
        };


        while (dof<8) {
            const mp = (ry>>6)*mapX+(rx>>6);

            if(mp > 0 && mp < mapX*mapY && map[mp]==1){
                hx = rx;
                hy = ry;
                disH = dist(pos_x, pos_y, hx, hy, ra);
                dof = 8;
            } else {
                rx += xo;
                ry += yo;
                ++dof;
            };
        };


        // Vertical


        dof = 0;
        var disV = Infinity, vx=pos_x, vy=pos_y;
        const nTan = Tan;

        if(ra > P2 && ra < P3){
            rx = ((pos_x>>6)<<6)-0.0001;
            xo = -64;
        };

        if(ra < P2 || ra > P3){
            rx = ((pos_x>>6)<<6) + 64;
            xo = 64;
        };
        
        ry = (pos_x-rx) * nTan+pos_y;
        yo = -xo*nTan;

        if(ra == 0 || ra == P1){
            rx = pos_x;
            ry = pos_y;
            dof = 8;
        };



        while (dof<8) {

            const mp = ry>>6*mapX+rx>>6;

            if(mp > 0 && mp < mapX*mapY && map[mp]==1){
                vx=rx;
                vy = ry;
                disV = dist(pos_x, pos_y, vx, vy, ra);
                dof = 8;
            } else {
                rx += xo;
                ry += yo;
                ++dof;
            };
        };




        var disT = Math.min(disV, disH);
        if(disV<disH){
            rx = vx;
            ry = vy;
        } else {
            rx = hx;
            ry = hy;
        };

        
        // Dessiner les murs

        disT*=Math.cos( to_pi(pangle-ra) );

        var lineH = Math.min(((mapS*ecran.height)/disT), ecran.height);
        const lineO = (ecran.height>>1) - (lineH>>1);
        
        context.lineWidth = 8;
        bresenham(context, r<<3, lineO, r<<3, lineH+lineO, disV<disH?"#FAC":"#946");
    };
};