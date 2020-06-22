"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingHandler = void 0;
const __1 = require("..");
async function pingHandler(req) {
    return {
        name: __1.server.name,
        version: __1.server.version,
        runtime: __1.server.getRuntime(),
    };
}
exports.pingHandler = pingHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb250cm9sbGVycy9waW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDBCQUEwQztBQUVuQyxLQUFLLFVBQVUsV0FBVyxDQUFDLEdBQW9CO0lBQ3BELE9BQU87UUFDTCxJQUFJLEVBQUUsVUFBTSxDQUFDLElBQUk7UUFDakIsT0FBTyxFQUFFLFVBQU0sQ0FBQyxPQUFPO1FBQ3ZCLE9BQU8sRUFBRSxVQUFNLENBQUMsVUFBVSxFQUFFO0tBQzdCLENBQUE7QUFDSCxDQUFDO0FBTkQsa0NBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBzZXJ2ZXIsIFBpbmdSZXNwb25zZSB9IGZyb20gJy4uJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBpbmdIYW5kbGVyKHJlcTogZXhwcmVzcy5SZXF1ZXN0KTogUHJvbWlzZTxQaW5nUmVzcG9uc2V8dW5kZWZpbmVkPiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogc2VydmVyLm5hbWUsXG4gICAgdmVyc2lvbjogc2VydmVyLnZlcnNpb24sXG4gICAgcnVudGltZTogc2VydmVyLmdldFJ1bnRpbWUoKSxcbiAgfVxufVxuIl19