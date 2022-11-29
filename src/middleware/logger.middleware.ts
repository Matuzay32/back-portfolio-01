import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TOKEN_SECRET } from 'src/users/ENUMS/secret.enum';
import { verify } from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('...ESTE ES MI MIDDLE WARE');

    try {
      const token = req.header('token');
      if (!token)
        res.status(401).json({
          error: "Incluya el token en la cabeceras| ** token: 'su token' **",
        });
      const verified = verify(token, TOKEN_SECRET.TOKEN_SECRET);

      //   const admin = verified.role.includes('ADMIN');
      //   const user = verified.role.includes('USER');
      if (verified && verified.rol === 'ADMIN') {
        next();
      } else if (verified.rol != 'ADMIN' && !verified) {
        res.status(401).json({
          error: `Tiene que estar registrado y ser ADMIN para disponer de esta ruta`,
        });
      } else if (verified.rol != 'ADMIN') {
        res.status(401).json({
          mensaje: 'Usted no tiene privilegios de administrador',
        });
      }
    } catch (error) {
      console.log(
        '\x1b[31m%s\x1b[0m',
        `********* FALTA EL TOKEN EN LA CABECERA ***************`,
      );
      res.status(401).json({ error: 'incorrect token credentials' });
    }
  }
}
