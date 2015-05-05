package com.rde.geodroid.ersatz;



public class PointD {

    public double x;
    public double y;

    public PointD() {
    }

    public PointD(double x, double y) {

        this.x = x;
        this.y = y;
    }

    public PointD(PointD d) {

        this.x = d.x;
        this.y = d.y;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PointD pointD = (PointD) o;

        if (Double.compare(pointD.x, x) != 0) return false;
        if (Double.compare(pointD.y, y) != 0) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        temp = Double.doubleToLongBits(x);
        result = (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(y);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }

    @Override
    public String toString() {
        return "PointD{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}
