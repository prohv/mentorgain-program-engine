"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var json = function (v) { return v; };
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var programs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    programs = [
                        {
                            name: 'Google AI Track',
                            description: 'ML fundamentals + real-world AI systems.',
                            isActive: true,
                            maxParticipants: 50,
                            price: 0,
                            form: [
                                { id: 'motivation', label: 'Why AI?', type: 'text', required: true },
                                { id: 'experience', label: 'Years of ML experience', type: 'number', required: true },
                                { id: 'domain', label: 'Preferred domain', type: 'select', required: true, options: ['Vision', 'NLP', 'Systems'] },
                            ],
                            startDate: new Date('2026-03-01'),
                            endDate: new Date('2026-06-01'),
                        },
                        {
                            name: 'Microsoft Full Stack Bootcamp',
                            description: 'End-to-end web engineering.',
                            isActive: true,
                            maxParticipants: 80,
                            price: 199,
                            form: [
                                { id: 'stack', label: 'Primary stack', type: 'select', required: true, options: ['MERN', 'Next.js', 'Spring'] },
                                { id: 'projects', label: 'Best project link', type: 'text', required: true },
                            ],
                            startDate: new Date('2026-02-15'),
                            endDate: new Date('2026-05-15'),
                        },
                        {
                            name: 'Amazon Backend Systems',
                            description: 'Scalable APIs & distributed systems.',
                            isActive: true,
                            maxParticipants: 60,
                            price: 149,
                            form: [
                                { id: 'language', label: 'Primary language', type: 'select', required: true, options: ['Java', 'Go', 'Python'] },
                                { id: 'systems', label: 'System design exposure', type: 'text', required: true },
                            ],
                            startDate: new Date('2026-03-10'),
                            endDate: new Date('2026-06-10'),
                        },
                        {
                            name: 'Meta Frontend Fellowship',
                            description: 'UI engineering at scale.',
                            isActive: true,
                            maxParticipants: 70,
                            price: 129,
                            form: [
                                { id: 'framework', label: 'Framework', type: 'select', required: true, options: ['React', 'Vue', 'Svelte'] },
                                { id: 'portfolio', label: 'Portfolio link', type: 'text', required: true },
                            ],
                            startDate: new Date('2026-04-01'),
                            endDate: new Date('2026-07-01'),
                        },
                        {
                            name: 'AWS Cloud & DevOps',
                            description: 'Cloud-native infra and CI/CD.',
                            isActive: true,
                            maxParticipants: 40,
                            price: 179,
                            form: [
                                { id: 'cloud', label: 'Cloud used', type: 'select', required: true, options: ['AWS', 'GCP', 'Azure'] },
                                { id: 'ci', label: 'CI/CD experience', type: 'text', required: true },
                            ],
                            startDate: new Date('2026-02-01'),
                            endDate: new Date('2026-04-30'),
                        },
                        {
                            name: 'Cybersecurity by Palo Alto',
                            description: 'Blue-team skills & threat hunting.',
                            isActive: true,
                            maxParticipants: 30,
                            price: 99,
                            form: [
                                { id: 'ctf', label: 'CTFs participated', type: 'number', required: true },
                                { id: 'interest', label: 'Why security?', type: 'text', required: true },
                            ],
                            startDate: new Date('2026-05-01'),
                            endDate: new Date('2026-08-01'),
                        },
                        {
                            name: 'Netflix Data Science',
                            description: 'Applied data science on real problems.',
                            isActive: true,
                            maxParticipants: 25,
                            price: 199,
                            form: [
                                { id: 'python', label: 'Python skill (1–10)', type: 'number', required: true },
                                { id: 'projects', label: 'Data projects', type: 'text', required: true },
                            ],
                            startDate: new Date('2026-03-20'),
                            endDate: new Date('2026-06-20'),
                        },
                        {
                            name: 'Apple iOS Lab',
                            description: 'Swift & production iOS apps.',
                            isActive: true,
                            maxParticipants: 35,
                            price: 149,
                            form: [
                                { id: 'swift', label: 'Swift experience (years)', type: 'number', required: true },
                                { id: 'apps', label: 'Published apps', type: 'text', required: true },
                            ],
                            startDate: new Date('2026-04-05'),
                            endDate: new Date('2026-07-05'),
                        },
                        {
                            name: 'OpenAI ML Systems',
                            description: 'ML infra & evaluation pipelines.',
                            isActive: true,
                            maxParticipants: 20,
                            price: 0,
                            form: [
                                { id: 'ml', label: 'ML background', type: 'text', required: true },
                                { id: 'papers', label: 'Papers read', type: 'text', required: true },
                            ],
                            startDate: new Date('2026-05-10'),
                            endDate: new Date('2026-08-10'),
                        },
                        {
                            name: 'Stripe Payments Engineering',
                            description: 'High-scale fintech systems.',
                            isActive: true,
                            maxParticipants: 45,
                            price: 159,
                            form: [
                                { id: 'backend', label: 'Backend experience', type: 'text', required: true },
                                { id: 'scale', label: 'Systems at scale', type: 'text', required: true },
                            ],
                            startDate: new Date('2026-02-20'),
                            endDate: new Date('2026-05-20'),
                        },
                    ];
                    return [4 /*yield*/, prisma.program.createMany({
                            skipDuplicates: true,
                            data: programs.map(function (p) { return ({
                                name: p.name,
                                description: p.description,
                                isActive: p.isActive,
                                maxParticipants: p.maxParticipants,
                                price: p.price,
                                formSchema: json(p.form),
                                startDate: p.startDate,
                                endDate: p.endDate,
                            }); }),
                        })];
                case 1:
                    _a.sent();
                    console.log('Seeded 10 programs');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(console.error)
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, prisma.$disconnect()];
}); }); });
