"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plexHandler = void 0;
const config = require("config");
const fs = require("fs-extra");
const path = require("path");
const __1 = require("..");
let counter = 0;
const OUTPUT_PATH = config.get('plex.logdir');
__1.PlexDispatcher.registerHandler('*', async function (payload, files) {
    const file = path.join(OUTPUT_PATH, Date.now() + '.' + (++counter));
    fs.writeFileSync(file, JSON.stringify(payload));
});
function toFileInfo(file) {
    const { path, fieldname, mimetype, size } = file;
    return { path, fieldname, mimetype, size };
}
/**
 * Request handler (controller) for Plex webhook requests.
 * Plex posts using multi-part uploads.
 * The server route wrapper parses the webhook "payload" as a JSON request body.
 * The server route wrapper directs the uploads to the OUTPUT_PATH and multer puts the files in req.files.
 * This controller calls the Plex dispatcher class with the parsed payload (amended with .fileInfo) and any files.
 * @param req
 */
async function plexHandler(req) {
    if (req.body && req.body.payload) {
        req.body = JSON.parse(req.body.payload);
        if (req.files) {
            const files = [];
            if (Array.isArray(req.files)) {
                files.push(...req.files.map((f) => toFileInfo(f)));
            }
            else {
                const reqFiles = req.files;
                for (const fieldname in reqFiles) {
                    files.push(...(reqFiles[fieldname].map((f) => toFileInfo(f))));
                }
            }
            if (files.length > 0) {
                req.body.fileInfo = files;
            }
        }
        await __1.PlexDispatcher.getInstance().dispatch(req.body, req.files);
        return {
            status: 'success',
        };
    }
    else {
        return {
            status: 'failure',
            reason: 'invalid input',
        };
    }
}
exports.plexHandler = plexHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb250cm9sbGVycy9wbGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUVqQywrQkFBK0I7QUFDL0IsNkJBQTZCO0FBRTdCLDBCQUFpRDtBQUVqRCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDaEIsTUFBTSxXQUFXLEdBQVcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN0RCxrQkFBYyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxXQUFVLE9BQVksRUFBRSxLQUFrQjtJQUNqRixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUMsR0FBRyxHQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNsRCxDQUFDLENBQUMsQ0FBQztBQVdILFNBQVMsVUFBVSxDQUFDLElBQXlCO0lBQzNDLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDakQsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQzdDLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0ksS0FBSyxVQUFVLFdBQVcsQ0FBQyxHQUFZO0lBQzVDLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNoQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDYixNQUFNLEtBQUssR0FBZSxFQUFFLENBQUM7WUFDN0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDNUIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFJLEdBQUcsQ0FBQyxLQUErQixDQUFDLEdBQUcsQ0FBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQzthQUNqRjtpQkFBTTtnQkFDTCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBa0QsQ0FBQztnQkFDeEUsS0FBSyxNQUFNLFNBQVMsSUFBSSxRQUFRLEVBQUU7b0JBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUMsQ0FBQztpQkFDbEU7YUFDRjtZQUNELElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3BCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzthQUMzQjtTQUNGO1FBQ0QsTUFBTSxrQkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRSxPQUFPO1lBQ0wsTUFBTSxFQUFFLFNBQVM7U0FDbEIsQ0FBQztLQUNIO1NBQU07UUFDTCxPQUFPO1lBQ0wsTUFBTSxFQUFFLFNBQVM7WUFDakIsTUFBTSxFQUFFLGVBQWU7U0FDeEIsQ0FBQztLQUNIO0FBQ0gsQ0FBQztBQTNCRCxrQ0EyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnY29uZmlnJztcbmltcG9ydCB7IFJlcXVlc3QgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCB7IE11bHRlckZpbGVzLCBQbGV4RGlzcGF0Y2hlciB9IGZyb20gJy4uJztcblxubGV0IGNvdW50ZXIgPSAwO1xuY29uc3QgT1VUUFVUX1BBVEg6IHN0cmluZyA9IGNvbmZpZy5nZXQoJ3BsZXgubG9nZGlyJyk7XG5QbGV4RGlzcGF0Y2hlci5yZWdpc3RlckhhbmRsZXIoJyonLCBhc3luYyBmdW5jdGlvbihwYXlsb2FkOiBhbnksIGZpbGVzOiBNdWx0ZXJGaWxlcyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBmaWxlID0gcGF0aC5qb2luKE9VVFBVVF9QQVRILCBEYXRlLm5vdygpKycuJysoKytjb3VudGVyKSk7XG4gIGZzLndyaXRlRmlsZVN5bmMoZmlsZSwgSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xufSk7XG5cblxuLyoqIHN1YnNldCBvZiBmaWVsZHMgZnJvbSBFeHByZXNzLk11bHRlci5GaWxlICovXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVJbmZvIHtcbiAgcGF0aDogc3RyaW5nO1xuICBmaWVsZG5hbWU6IHN0cmluZztcbiAgbWltZXR5cGU6IHN0cmluZztcbiAgc2l6ZTogbnVtYmVyO1xufVxuXG5mdW5jdGlvbiB0b0ZpbGVJbmZvKGZpbGU6IEV4cHJlc3MuTXVsdGVyLkZpbGUpOiBGaWxlSW5mbyB7XG4gIGNvbnN0IHsgcGF0aCwgZmllbGRuYW1lLCBtaW1ldHlwZSwgc2l6ZSB9ID0gZmlsZTtcbiAgcmV0dXJuIHsgcGF0aCwgZmllbGRuYW1lLCBtaW1ldHlwZSwgc2l6ZSB9O1xufVxuXG4vKipcbiAqIFJlcXVlc3QgaGFuZGxlciAoY29udHJvbGxlcikgZm9yIFBsZXggd2ViaG9vayByZXF1ZXN0cy5cbiAqIFBsZXggcG9zdHMgdXNpbmcgbXVsdGktcGFydCB1cGxvYWRzLiBcbiAqIFRoZSBzZXJ2ZXIgcm91dGUgd3JhcHBlciBwYXJzZXMgdGhlIHdlYmhvb2sgXCJwYXlsb2FkXCIgYXMgYSBKU09OIHJlcXVlc3QgYm9keS5cbiAqIFRoZSBzZXJ2ZXIgcm91dGUgd3JhcHBlciBkaXJlY3RzIHRoZSB1cGxvYWRzIHRvIHRoZSBPVVRQVVRfUEFUSCBhbmQgbXVsdGVyIHB1dHMgdGhlIGZpbGVzIGluIHJlcS5maWxlcy5cbiAqIFRoaXMgY29udHJvbGxlciBjYWxscyB0aGUgUGxleCBkaXNwYXRjaGVyIGNsYXNzIHdpdGggdGhlIHBhcnNlZCBwYXlsb2FkIChhbWVuZGVkIHdpdGggLmZpbGVJbmZvKSBhbmQgYW55IGZpbGVzLlxuICogQHBhcmFtIHJlcSBcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBsZXhIYW5kbGVyKHJlcTogUmVxdWVzdCk6IFByb21pc2U8YW55PiB7XG4gIGlmIChyZXEuYm9keSAmJiByZXEuYm9keS5wYXlsb2FkKSB7XG4gICAgcmVxLmJvZHkgPSBKU09OLnBhcnNlKHJlcS5ib2R5LnBheWxvYWQpO1xuICAgIGlmIChyZXEuZmlsZXMpIHtcbiAgICAgIGNvbnN0IGZpbGVzOiBGaWxlSW5mb1tdID0gW107XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXEuZmlsZXMpKSB7XG4gICAgICAgIGZpbGVzLnB1c2goLi4uKHJlcS5maWxlcyBhcyBFeHByZXNzLk11bHRlci5GaWxlW10pLm1hcCggKGYpID0+IHRvRmlsZUluZm8oZikgKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXFGaWxlcyA9IHJlcS5maWxlcyBhcyB7IFsga2V5OiBzdHJpbmddOiBFeHByZXNzLk11bHRlci5GaWxlW10gfTtcbiAgICAgICAgZm9yIChjb25zdCBmaWVsZG5hbWUgaW4gcmVxRmlsZXMpIHtcbiAgICAgICAgICBmaWxlcy5wdXNoKC4uLihyZXFGaWxlc1tmaWVsZG5hbWVdLm1hcCggKGYpID0+IHRvRmlsZUluZm8oZikgKSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXEuYm9keS5maWxlSW5mbyA9IGZpbGVzO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCBQbGV4RGlzcGF0Y2hlci5nZXRJbnN0YW5jZSgpLmRpc3BhdGNoKHJlcS5ib2R5LCByZXEuZmlsZXMpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6ICdmYWlsdXJlJyxcbiAgICAgIHJlYXNvbjogJ2ludmFsaWQgaW5wdXQnLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==