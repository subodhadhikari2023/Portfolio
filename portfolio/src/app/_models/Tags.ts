export class Tags {
    static readonly ANGULAR = new Tags('Angular', 'red');
    static readonly JAVA = new Tags('Java', 'orange');
    static readonly SPRING_BOOT = new Tags('Spring Boot', 'blue');
    static readonly HIBERNATE = new Tags('Hibernate', 'magenta');
    static readonly TYPESCRIPT = new Tags('TypeScript', 'green');
    private constructor(private readonly key: string, public readonly color: string) { }
    toString() {
        return this.key;
    }
}