module.exports = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest'
    },
    moduleNameMapper: {
        "^@lib/(.*)$": "<rootDir>/lib/$1",
        "^@engine-core/(.*)$": "<rootDir>/engine/core/$1",
    },
};