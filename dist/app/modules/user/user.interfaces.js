"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = exports.Role = exports.Status = void 0;
var Status;
(function (Status) {
    Status["ACTIVE"] = "ACTIVE";
    Status["INACTIVE"] = "INACTIVE";
    Status["BLOCKED"] = "BLOCKED";
})(Status || (exports.Status = Status = {}));
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
