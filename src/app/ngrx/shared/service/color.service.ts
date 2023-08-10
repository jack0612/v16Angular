import { inject, Injectable } from "@angular/core";
import { ColorConfig } from "../util-logger/color-config";
import { LogLevel } from "../util-logger/log-level";

export abstract class ColorService {
    abstract apply(level: LogLevel, msg: string): string;
}
@Injectable({
    providedIn: 'root'
  })
@Injectable()
export class DefaultColorService implements ColorService {
    config = inject(ColorConfig);

    apply(level: LogLevel, msg: string): string {
        const key = LogLevel[level].toLowerCase() as keyof ColorConfig;
        const color = this.config[key];
        
        // For the sake of simplicity, we don't use an external 
        // library like chalk here
        return `\x1b[${color}m${msg}\x1b[0m`;
    }
}