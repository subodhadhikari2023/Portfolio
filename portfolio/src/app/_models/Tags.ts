export class Tags {
    static readonly ANGULAR = new Tags('Angular', 'red');
    static readonly JAVA = new Tags('Java', 'orange');
    static readonly SPRING_BOOT = new Tags('Spring Boot', 'blue');
    static readonly HIBERNATE = new Tags('Hibernate', 'magenta');
    static readonly TYPESCRIPT = new Tags('TypeScript', 'green');
    static readonly THYMELEAF = new Tags('Thymeleaf', 'purple');
    static readonly MYSQL = new Tags('MySQL', 'voilet');
    static readonly JAVASCRIPT = new Tags('JavaScript', 'brown');
    static readonly PHP = new Tags('PHP', 'green');
    static readonly SPRING_SECURITY = new Tags('Spring Security', 'red');
    static readonly SPRING_MVC = new Tags('Spring MVC', 'violet');
    private constructor(private readonly key: string, public readonly color: string) { }
    toString() {
        return this.key;
    }
}