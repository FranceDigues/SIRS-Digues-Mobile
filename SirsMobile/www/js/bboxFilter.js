/**
 * Created by roch Dardie on 09/06/15.
 */


//on trie sur les x
//trie sur les y
//cherche  premiere et derniere valeur, puis kill le reste


function couchFilter (doc, bbox) {

    if(doc.xmin > bbox.xmin) {
        if(doc.xmin < bbox.xmax) emit(doc._id, doc);
    }
    else if(doc.xmax > bbox.xmin) {
        if(doc.xmax < bbox.xmax) emit(doc._id, doc);
    }
    else if(doc.ymin > bbox.ymin) {
        if(doc.ymin < bbox.ymax) emit(doc._id, doc);
    }
    else if(doc.ymax > bbox.ymin) {
        if(doc.ymax < bbox.ymax) emit(doc._id, doc);
    }

}