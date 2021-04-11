class Utils():
    @staticmethod
    def img2blob(img : object):
        # Convert digital data to binary format
        with open(filename, 'rb') as file:
            binaryData = file.read()
        return binaryData