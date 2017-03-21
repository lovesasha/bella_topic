module.exports = {
    paths: {
        config: '/api/config',
        index: '/container/getIndex?from=feed&type=topic&value=%E5%A7%9A%E8%B4%9D%E5%A8%9C',
        comment: '/api/comments/create',
        admire: '/api/attitudes/create',
        follow: '/api/friendships/create',
        signin: '/container/button?request_url=http%3A%2F%2Fi.huati.weibo.com%2Fsuper_active%2Fcheckin%3Fpageid%3D100808870fc699b40bd98a1c30c98798df2869'
    },
    caicai: {
        cookie: '_T_WM=dfd1343b186790d8c0a83f2550765996; SUB=_2A251y0AtDeTxGedI7VQZ8izPzjuIHXVXNGBlrDV6PUJbkdBeLVTWkW1Es30k8bbR8MP9fwXl3utJbSoptA..; SUHB=0y0Iea-cM7LZO-; SCF=AgkQvkxVIL1BK92NEIpOc5I9h9aBL08A_tVJwsfxapIzx25ofj0H87oV8aRpBjwr6bZFFRBkKjh7OT862RGXse4.; SSOLoginState=1489973373; H5_INDEX=0_all; H5_INDEX_TITLE=%E8%8F%9C%E8%8F%9C%E7%88%B1%E7%8E%A9%E5%AD%90; M_WEIBOCN_PARAMS=featurecode%3D20000180%26oid%3D4087296950962388%26luicode%3D20000061%26lfid%3D4087296950962388',
        st: '',
        library: [],
        record: {
            comment: {
                file: './record/comment_caicai.txt',
                data: {}
            }
        },
        log: {
            comment: './log/comment_caicai.txt'
        }
    },
    caicaix: {
        cookie: '_T_WM=447eafa8dc9333a4c3c33ea87610faca; SUB=_2A251y0kPDeRxGeBP7lAQ9SvEyDuIHXVXNFdHrDV6PUJbkdBeLVTskW2KXMxMvavuNQSwCzWKrmCf5xPkNA..; SUHB=0U1JUSUFsB9PH5; SCF=AqQ0GJZQcsgzvVGWvRLwk6U5TpUgnsGzHpyLIO7EEsbvxElio0U1Etli0n-ZNDloNwkUdAH0TapZTNPBHApl2ro.; SSOLoginState=1489975647; H5_INDEX=0_all; H5_INDEX_TITLE=%E8%8F%9C%E8%8F%9C%E7%88%B1%E7%8E%A9%E5%AD%90%E5%B0%8F%E5%8F%B7; M_WEIBOCN_PARAMS=uicode%3D20000174',
        st: '',
        record: {
            admire: {
                file: './record/admire_caicaix.txt',
                data: {}
            },
            follow: {
                file: './record/follow_caicaix.txt',
                data: {}
            }
        },
        log: {
            admire: './log/admire_caicaix.txt',
            follow: './log/follow_caicaix.txt'
        }
    },
    fengzi: {
        cookie: '',
        st: '',
        library: [],
        record: {
            comment: {
                file: './record/comment_fengzi.txt',
                data: {}
            }
        },
        log: {
            comment: './log/comment_fengzi.txt'
        }
    }
};
