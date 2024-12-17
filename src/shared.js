let imageUrl = ""; // Private variable

// Getter
export const getImageUrl = () => imageUrl;

// Setter
export const setImageUrl = (url) => {
    imageUrl = url;
    console.log("Updated Image URL:", imageUrl); // Debug log
};