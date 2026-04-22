import compression from 'compression';

const configCompression = {
    filter: (req, res) => {
        if (!req.headers['x-no-compression']) {
            return compression.filter(req, res);
        }
        return false;
    },
    level: 6,
    threshold: 1024,
};

export default configCompression;
