module.exports = {
    "roots": [
        "<rootDir>/tests/"
    ],
    "setupFiles": [],
    "collectCoverage": true,
    "collectCoverageFrom": [
        "**/*.scss"
    ],
    "transform": {},
    "transformIgnorePatterns": [
        "<rootDir>/node_modules/"
    ],
    "testMatch": ["**/tests/*.js"],
    "testPathIgnorePatterns": [
        "<rootDir>/node_modules/",
    ],
    "testEnvironment": 'jest-environment-node',
    "moduleFileExtensions": [
        "js"
    ]
}