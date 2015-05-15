package com.rde.geodroid.ersatz;


public class RectD {







    public static final int OUT_LEFT = 1;
    public static final int OUT_TOP = 2;
    public static final int OUT_RIGHT = 4;
    public static final int OUT_BOTTOM = 8;



    public double x;

    public double y;

    public double width;

    public double height;

    public RectD() {
    }

    public RectD(double x, double y, double w, double h) {
        setRect(x, y, w, h);
    }


    //ACCESSUER


    public double getMinX(){
        return getX();
    }
    public double getMaxX(){
        return getX()+getWidth();
    }

    public double getMinY(){
        return getY();
    }

    public double getMaxY()
    {
        return getY()+getHeight();
    }

    public double getCenterX() {
        return getX() + getWidth() / 2.0;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public String toString() {
        return getClass().getName()
                + "[x=" + x +
                ",y=" + y +
                ",w=" + width +
                ",h=" + height + "]";
    }


    //METH
    public boolean isEmpty() {
        return (width <= 0.0) || (height <= 0.0);
    }
    public void setRect(double x, double y, double w, double h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    public void setRect(RectD r) {
        this.x = r.getX();
        this.y = r.getY();
        this.width = r.getWidth();
        this.height = r.getHeight();
    }








    public int outcode(double x, double y) {
        int out = 0;
        if (this.width <= 0) {
            out |= OUT_LEFT | OUT_RIGHT;
        } else if (x < this.x) {
            out |= OUT_LEFT;
        } else if (x > this.x + this.width) {
            out |= OUT_RIGHT;
        }
        if (this.height <= 0) {
            out |= OUT_TOP | OUT_BOTTOM;
        } else if (y < this.y) {
            out |= OUT_TOP;
        } else if (y > this.y + this.height) {
            out |= OUT_BOTTOM;
        }
        return out;
    }


    public RectD getBounds2D() {
        return new RectD(x, y, width, height);
    }


    public RectD createIntersection(RectD r) {
        RectD dest = new RectD();
        RectD.intersect(this, r, dest);
        return dest;
    }

    public RectD createUnion(RectD r) {
        RectD dest = new RectD();
        RectD.union(this, r, dest);
        return dest;
    }




    public boolean contains(double x, double y) {
        double x0 = getX();
        double y0 = getY();
        return (x >= x0 &&
                y >= y0 &&
                x < x0 + getWidth() &&
                y < y0 + getHeight());
    }


    public boolean intersects(double x, double y, double w, double h) {
        if (isEmpty() || w <= 0 || h <= 0) {
            return false;
        }
        double x0 = getX();
        double y0 = getY();
        return (x + w > x0 &&
                y + h > y0 &&
                x < x0 + getWidth() &&
                y < y0 + getHeight());
    }


    public boolean contains(double x, double y, double w, double h) {
        if (isEmpty() || w <= 0 || h <= 0) {
            return false;
        }
        double x0 = getX();
        double y0 = getY();
        return (x >= x0 &&
                y >= y0 &&
                (x + w) <= x0 + getWidth() &&
                (y + h) <= y0 + getHeight());
    }



    public static void intersect(RectD src1,
                                 RectD src2,
                                 RectD dest) {
        double x1 = Math.max(src1.getMinX(), src2.getMinX());
        double y1 = Math.max(src1.getMinY(), src2.getMinY());
        double x2 = Math.min(src1.getMaxX(), src2.getMaxX());
        double y2 = Math.min(src1.getMaxY(), src2.getMaxY());
        dest.setRect(x1, y1, x2-x1, y2-y1);
    }


    public static void union(RectD src1,
                             RectD src2,
                             RectD dest) {
        double x1 = Math.min(src1.getMinX(), src2.getMinX());
        double y1 = Math.min(src1.getMinY(), src2.getMinY());
        double x2 = Math.max(src1.getMaxX(), src2.getMaxX());
        double y2 = Math.max(src1.getMaxY(), src2.getMaxY());
        dest.setRect(x1, y1, x2, y2);
    }


    public void add(double newx, double newy) {
        double x1 = Math.min(this.getMinX(), newx);
        double x2 = Math.max(this.getMaxX(), newx);
        double y1 = Math.min(this.getMinY(), newy);
        double y2 = Math.max(this.getMaxY(), newy);
        setRect(x1, y1, x2 - x1, y2 - y1);
    }



    public void add(RectD r) {
        double x1 = Math.min(this.getMinX(), r.getMinX());
        double x2 = Math.max(this.getMaxX(), r.getMaxX());
        double y1 = Math.min(this.getMinY(), r.getMinY());
        double y2 = Math.max(this.getMaxY(), r.getMaxY());
        setRect(x1, y1, x2 - x1, y2 - y1);
    }




    public int hashCode() {
        long bits = java.lang.Double.doubleToLongBits(getX());
        bits += java.lang.Double.doubleToLongBits(getY()) * 37;
        bits += java.lang.Double.doubleToLongBits(getWidth()) * 43;
        bits += java.lang.Double.doubleToLongBits(getHeight()) * 47;
        return (((int) bits) ^ ((int) (bits >> 32)));
    }

}

















//    public boolean intersectsLine(double x1, double y1, double x2, double y2) {
//        int out1, out2;
//        if ((out2 = outcode(x2, y2)) == 0) {
//            return true;
//        }
//        while ((out1 = outcode(x1, y1)) != 0) {
//            if ((out1 & out2) != 0) {
//                return false;
//            }
//            if ((out1 & (OUT_LEFT | OUT_RIGHT)) != 0) {
//                double x = getX();
//                if ((out1 & OUT_RIGHT) != 0) {
//                    x += getWidth();
//                }
//                y1 = y1 + (x - x1) * (y2 - y1) / (x2 - x1);
//                x1 = x;
//            } else {
//                double y = getY();
//                if ((out1 & OUT_BOTTOM) != 0) {
//                    y += getHeight();
//                }
//                x1 = x1 + (y - y1) * (x2 - x1) / (y2 - y1);
//                y1 = y;
//            }
//        }
//        return true;
//    }








