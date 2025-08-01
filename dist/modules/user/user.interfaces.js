"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = exports.Role = exports.IsActive = void 0;
var IsActive;
(function (IsActive) {
    IsActive["ACTIVE"] = "ACTIVE";
    IsActive["INACTIVE"] = "INACTIVE";
    IsActive["BLOCKED"] = "BLOCKED";
})(IsActive || (exports.IsActive = IsActive = {}));
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["AGENT"] = "AGENT";
    Role["ADMIN"] = "ADMIN";
})(Role || (exports.Role = Role = {}));
var Provider;
(function (Provider) {
    Provider["GOOGLE"] = "google";
    Provider["CREDENTIALS"] = "credentials";
})(Provider || (exports.Provider = Provider = {}));
