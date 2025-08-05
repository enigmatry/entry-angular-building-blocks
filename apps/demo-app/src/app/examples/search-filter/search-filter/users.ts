/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-magic-numbers */
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

enum Country {
    unitedStates = 'United States',
    china = 'China',
    india = 'India',
    brazil = 'Brazil',
    russia = 'Russia',
    japan = 'Japan',
    germany = 'Germany',
    unitedKingdom = 'United Kingdom',
    france = 'France',
    italy = 'Italy',
    canada = 'Canada',
    australia = 'Australia',
    southKorea = 'South Korea',
    mexico = 'Mexico',
    indonesia = 'Indonesia',
    argentina = 'Argentina',
    spain = 'Spain',
    netherlands = 'Netherlands',
    serbia = 'Serbia',
    southAfrica = 'South Africa'
}

interface User {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    occupation: Occupation;
    lastLogin: Date;
    country: Country;
}

const LIST_OF_USERS: User[] = [
    {
        id: '1',
        userName: 'emmett.oconnell@example.com',
        firstName: 'Emmett',
        lastName: 'O\'Connell',
        dateOfBirth: new Date(1992, 3, 3),
        occupation: Occupation.electrician,
        lastLogin: new Date(),
        country: Country.netherlands
    },
    {
        id: '2',
        userName: 'lila.fairbanks@example.com',
        firstName: 'Lila',
        lastName: 'Fairbanks',
        dateOfBirth: new Date(1985, 5, 26),
        occupation: Occupation.unknown,
        lastLogin: new Date(),
        country: Country.serbia
    },
    {
        id: '3',
        userName: 'preston.mcallister@example.com',
        firstName: 'Preston',
        lastName: 'McAllister',
        dateOfBirth: new Date(1977, 9, 14),
        occupation: Occupation.baker,
        lastLogin: new Date(),
        country: Country.argentina
    },
    {
        id: '4',
        userName: 'gracie.monroe@example.com',
        firstName: 'Gracie',
        lastName: 'Monroe',
        dateOfBirth: new Date(2000, 2, 8),
        occupation: Occupation.plumber,
        lastLogin: new Date(),
        country: Country.netherlands
    },
    {
        id: '5',
        userName: 'silas.harrington@example.com',
        firstName: 'Silas',
        lastName: 'Harrington',
        dateOfBirth: new Date(1965, 11, 11),
        occupation: Occupation.teacher,
        lastLogin: new Date(),
        country: Country.india
    },
    {
        id: '6',
        userName: 'elodie.whitmore@example.com',
        firstName: 'Elodie',
        lastName: 'Whitmore',
        dateOfBirth: new Date(1996, 7, 22),
        occupation: Occupation.baker,
        lastLogin: new Date(),
        country: Country.unitedKingdom
    },
    {
        id: '7',
        userName: 'conrad.sullivan@example.com',
        firstName: 'Conrad',
        lastName: 'Sullivan',
        dateOfBirth: new Date(1983, 0, 15),
        occupation: Occupation.soldier,
        lastLogin: new Date(),
        country: Country.unitedStates
    },
    {
        id: '8',
        userName: 'rosalind.espinoza@example.com',
        firstName: 'Rosalind',
        lastName: 'Espinoza',
        dateOfBirth: new Date(1973, 4, 19),
        occupation: Occupation.baker,
        lastLogin: new Date(),
        country: Country.france
    },
    {
        id: '9',
        userName: 'nolan.baxter@example.com',
        firstName: 'Nolan',
        lastName: 'Baxter',
        dateOfBirth: new Date(1987, 6, 30),
        occupation: Occupation.doctor,
        lastLogin: new Date(),
        country: Country.germany
    },
    {
        id: '10',
        userName: 'greta.underwood@example.com',
        firstName: 'Greta',
        lastName: 'Underwood',
        dateOfBirth: new Date(1994, 1, 21),
        occupation: Occupation.painter,
        lastLogin: new Date(),
        country: Country.spain
    },
    {
        id: '11',
        userName: 'clair.underwood@example.com',
        firstName: 'Clair',
        lastName: 'Underwood',
        dateOfBirth: new Date(1951, 1, 1),
        occupation: Occupation.teacher,
        lastLogin: new Date(),
        country: Country.indonesia
    }
];

export {
    Occupation,
    Country, LIST_OF_USERS
};

export type { User };
