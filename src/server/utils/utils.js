export const validate = (tab, value) => {
    const val = value.toLowerCase();
    if (val === "error") {
        return false;
    }
    if (tab.filter(vendor => vendor.name.toLowerCase() === val).length > 0) {
        //déjà existant
        return false;
    }
    //n'existe pas
    return true;
};

export const deleteFromTab = (tab, id) => {
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id === id) {
            tab.splice(i, 1);
            return true;
        }
    }
    return false;
};
