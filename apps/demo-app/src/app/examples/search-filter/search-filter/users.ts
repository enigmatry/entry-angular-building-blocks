enum Occupation {
    unknown = 0,
    electrician = 1,
    soldier = 2,
    doctor = 3,
    painter = 4,
    baker = 5,
    teacher = 6,
    plumber = 7
}

class User {
    id?: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    occupation: Occupation;

    constructor(data?: Partial<User>) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) { (this)[property] = (data)[property]; }
            }
        }
    }
}

const LIST_OF_USERS = [
    new User({
        id: '1',
        userName: 'emmett.oconnell@example.com',
        firstName: 'Emmett',
        lastName: 'O\'Connell',
        dateOfBirth: new Date(1992, 3, 3),
        occupation: Occupation.electrician
    }),
    new User({
        id: '2',
        userName: 'lila.fairbanks@example.com',
        firstName: 'Lila',
        lastName: 'Fairbanks',
        dateOfBirth: new Date(1985, 5, 26),
        occupation: Occupation.unknown
    }),
    new User({
        id: '3',
        userName: 'preston.mcallister@example.com',
        firstName: 'Preston',
        lastName: 'McAllister',
        dateOfBirth: new Date(1977, 9, 14),
        occupation: Occupation.baker
    }),
    new User({
        id: '4',
        userName: 'gracie.monroe@example.com',
        firstName: 'Gracie',
        lastName: 'Monroe',
        dateOfBirth: new Date(2000, 2, 8),
        occupation: Occupation.plumber
    }),
    new User({
        id: '5',
        userName: 'silas.harrington@example.com',
        firstName: 'Silas',
        lastName: 'Harrington',
        dateOfBirth: new Date(1965, 11, 11),
        occupation: Occupation.teacher
    }),
    new User({
        id: '6',
        userName: 'elodie.whitmore@example.com',
        firstName: 'Elodie',
        lastName: 'Whitmore',
        dateOfBirth: new Date(1996, 7, 22),
        occupation: Occupation.baker
    }),
    new User({
        id: '7',
        userName: 'conrad.sullivan@example.com',
        firstName: 'Conrad',
        lastName: 'Sullivan',
        dateOfBirth: new Date(1983, 0, 15),
        occupation: Occupation.soldier
    }),
    new User({
        id: '8',
        userName: 'rosalind.espinoza@example.com',
        firstName: 'Rosalind',
        lastName: 'Espinoza',
        dateOfBirth: new Date(1973, 4, 19),
        occupation: Occupation.baker
    }),
    new User({
        id: '9',
        userName: 'nolan.baxter@example.com',
        firstName: 'Nolan',
        lastName: 'Baxter',
        dateOfBirth: new Date(1987, 6, 30),
        occupation: Occupation.doctor
    }),
    new User({
        id: '10',
        userName: 'greta.underwood@example.com',
        firstName: 'Greta',
        lastName: 'Underwood',
        dateOfBirth: new Date(1994, 1, 21),
        occupation: Occupation.painter
    }),
    new User({
        id: '11',
        userName: 'clair.underwood@example.com',
        firstName: 'Clair',
        lastName: 'Underwood',
        dateOfBirth: new Date(1951, 1, 1),
        occupation: Occupation.teacher
    })
];

export {
    Occupation,
    User,
    LIST_OF_USERS
};
