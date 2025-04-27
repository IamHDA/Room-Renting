export const priceFormat = (price) => {
    let tmp = price.toString();
    tmp = tmp.replace('.', ',');
    return tmp;
}

export const getImageMime = (base64) => {
    if (base64.startsWith('/9j/')) return 'image/jpeg';
    if (base64.startsWith('iVBOR')) return 'image/png';
    if (base64.startsWith('R0lGOD')) return 'image/gif';
    if (base64.startsWith('UklGR')) return 'image/webp';
    return 'image/jpeg';
}

export const addressFormat = (address) => {
    let addressText = "";
    if (address.detail !== "") addressText += address.detail;
    if (address.ward !== "") addressText += addressText.length > 0 ? ", " + address.ward : address.ward;
    if (address.district !== "") addressText += addressText.length > 0 ? ", " + address.district : address.district;
    if (address.city !== "") addressText += addressText.length > 0 ? ", " + address.city : address.city;
    return addressText;
}
