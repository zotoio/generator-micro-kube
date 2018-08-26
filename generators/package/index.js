'use strict';
const fs = require('fs');
const path = require('path');
const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('skip-bootstrap');
        this.bootstrap = !this.options['skip-bootstrap'];
    }

    configuring() {
        this.log('');
        this.log(`Creating a new micro service package..`);
        this.log('');
    }

    prompting() {
        let defaultVersion = '';

        if (fs.existsSync('package.json')) {
            const packageJson = require(path.join(process.cwd(), 'package.json'));
            defaultVersion = packageJson.version;
        }

        const prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'Package name:',
                validate: function(input) {
                    return Boolean(input);
                }
            },
            {
                type: 'input',
                name: 'version',
                message: `Package version:`,
                default: defaultVersion
            },
            {
                type: 'input',
                name: 'packageScope',
                message: `Package scope:`,
                default: ''
            },
            {
                type: 'input',
                name: 'dockerOrg',
                message: `Docker org name:`,
                default: '',
                validate: function(input) {
                    return Boolean(input);
                }
            }
        ];

        return this.prompt(prompts).then(props => {
            // To access props later use this.props.someAnswer;
            this.props = props;
            this.props.packagePath = path.resolve(`packages/${props.name}`);
            this.props.packageName = props.packageScope
                ? `${props.packageScope}/${props.name}`
                : props.name;
            _.merge(this.options.__store, this.props);
        });
    }

    writing() {
        const params = {
            name: this.props.name,
            packageName: this.props.packageName,
            version: this.props.version,
            packageScope: this.props.packageScope,
            dockerOrg: this.props.dockerOrg
        };
        [
            '.helmignore',
            'artillery.yml',
            'Chart.yaml',
            'Dockerfile',
            'tsconfig.json',
            'tslint.json',
            'values.yaml',
            'src/index.ts',
            'src/index.spec.ts',
            'templates/_helpers.tpl',
            'templates/deployment.yaml',
            'templates/NOTES.txt',
            'templates/service.yaml'
        ].forEach(fileName => {
            this.fs.copyTpl(
                this.templatePath(fileName),
                this.destinationPath(`${this.props.packagePath}/${fileName}`),
                params
            );
        });
        this.fs.copyTpl(
            this.templatePath('.envExample'),
            this.destinationPath(`${this.props.packagePath}/.env`),
            params
        );
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath(`${this.props.packagePath}/package.json`),
            params
        );
        this.fs.copyTpl(
            this.templatePath('_README.md'),
            this.destinationPath(`${this.props.packagePath}/README.md`),
            params
        );
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath(`${this.props.packagePath}/package.json`),
            params
        );
    }

    install() {
        const cwd = process.cwd();
        process.chdir(this.props.packagePath);

        this.installDependencies({
            bower: false,
            npm: false,
            yarn: true
        }).then(() => {
            process.chdir(cwd);
            if (this.bootstrap) {
                this.spawnCommandSync('yarn', ['run', 'bootstrap']);
            }
        });
    }

    end() {
        this.log('');
        this.log(`Success! Created package ${this.props.packageName} in ./packages`);
        this.log('');
    }
};
